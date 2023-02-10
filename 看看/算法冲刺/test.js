var data = {
  fileterType: 'union',
  properties: {
    fileterType: 'union',
    list: [
      {
        fileterType: 'union',
        list: [
          {
            type: '用户属性',
            property: 'vip等级',
            rule: 'all',
            value: '1'
          },
        ]
      }
    ]
  },
  actions: {
    fileterType: 'union',
    list: [
      {
        fileterType: 'union',
        list: [
          {
            time: '2023-02-08',
            done: 'true',
            count: 2,
            actionType: '埋点',
            action: 'Web浏览页面',
            filterList: {
              fileterType: 'union',
              list: [
                {
                  type: '用户属性',
                  property: 'vip等级',
                  rule: 'all',
                  value: '1'
                },
              ]
            }
          },
        ]
      }
    ]
  },
  combinations: [
    {
      fileterType: 'union',
      actionType: '埋点',
      action: 'Web浏览页面',
      list: [
        {
          type: '用户属性',
          property: 'vip等级',
          rule: 'all',
          value: '1'
        },
      ]
    }
  ]
}