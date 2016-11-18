grunt.initConfig({
  deploy: {
    liveservers: {
      options:{
        servers: [{
          host: '192.241.177.170',
          port: 22,
          username: 'root',
          password: 'password'
        }],
        cmds_before_deploy: ["some cmds you may want to exec before deploy"],
        cmds_after_deploy: ["forever restart", "some other cmds you want to exec after deploy"],
        deploy_path: '/opt/steed-website'
      }
    }
  },
})