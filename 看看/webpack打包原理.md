webpack打包原理

一、启动流程

- 通过pakage.json中配置的命令会找到node_modules/webpack/bin/webpack.js文件并执行，
- webpack.js中通过runCli(cli)，找到webpack-cli中的webpack-cli.js文件并执行
- webpack-cli中对webpack的配置文件以及脚本中的配置命令进行了合并，并通过webpack(config)函数调用了这些配置信息

二、编译过程/compiler

- 创建一个compiler，在compiler中定义了多种hooks（即compiler的生命周期）
- 通过plugin.apply(compiler)对config中的插件进行一个注册，方便其在webpack的各生命周期中调用
- 通过new WebpackOptionsApply().process(options, compiler);对config中除插件之外的配置转成webpack的plugin注入到webpack生命周期中
- plugin.apply(compiler)操作中会在插件中调用apply方法，apply方法可以拿到compiler对象，这样就可以对compiler的hooks做一个监听，当webpack执行到compiler某个hooks的生命周期时，即可触发插件中的事件
- 调用compiler.run(),run方法中调用了beforeRun、run的hooks，在runhooks中调用了compile方法，compile方法中调用了beforeCompile、compile的hooks，在compile阶段中创建了compilation对象，然后调用了make、finishMake、afterCompile的hooks，
- 在make阶段调用了EntryPlugin插件的回调函数，在回调函数调用了compilation.addEntry()  =》addModuleTree()  =》handleModuleCreation =》创建module图（moduleGraph），调用factorizeModule()将模块加入到队列中，通过addModule()将处理好的模块加入到module图中，通过buildModule()将模块加入到buildQueue（构建队列）中，通过_buildModule中调用module.build开始进行打包构建，

三、module处理阶段

- module.build是调用的module的子类NormalModule的build方法 =》doBuild(),doBuild()方法中调用了runLoaders()开始加载loader，加载完loader后执行processResult()对结果进行处理，然后执行doBuild传入的回调函数，通过this.parser.parse()对loader中的资源进行处理

四、输出阶段

所有的module处理完毕后执行compilation.seal方法，对module封装成chunk，在optimizeChunkModules的hooks中对chunk进行了优化，并调用了codeGeneration方法开始生产代码，再调用createChunkAssets()将所有的chunk，依赖放到manifest中，调用fileManifest.render()拿到最终的文件source，并emitAsset()对资源进行输出，将source放入compilation.assets中，然后开始调用compile的回调函数，开始调用onCompiled(),调用emitAssets方法=》hooks.emit将内容输出到文件夹

compiler和compilation的区别

- compiler在webpack构建之初就会创建，贯穿整个webpack的生命周期，compiler有且仅有一个
- compilation只存在于compile-make阶段，compilation可以有多个

