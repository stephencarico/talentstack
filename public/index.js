/* global Vue, VueRouter, axios */

// MAIN WEBSITE
var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      tags: {},
      posts: [],
      currentPost: {},
      email: "",
      password: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/tags/").then(function(response) {
      console.log(response.data)
      this.tags = response.data
    }.bind(this));
    axios.get("/posts/").then(function(response) {
      console.log(response.data)
      this.posts = response.data
    }.bind(this));
  },
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true
      } else {
        return false
      }
    },
    setCurrentPost: function(post) {
      this.currentPost = post;
      console.log(this.currentPost);
    },
    hideModal: function() {
      $('#exampleModal').modal('hide');
    },
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          console.log(response.data.jwt)
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          axios.get("/users/me").then(function(response) { localStorage.setItem("user_id", response.data.id);
          }.bind(this));
          console.log(localStorage)
          $('#exampleModal').modal('hide');
          router.push("/tags/" + tag.id);
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  },
  computed: {}
};
var TagsShowPage = {
  template: "#tags-show-page",
  data: function() {
    return {
      tags: [],
      tag: {},
      currentPost: {},
      email: "",
      password: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/tags/").then(function(response) {
      console.log(response.data)
      this.tags = response.data
    }.bind(this));
    axios.get("/tags/" + this.$route.params.id).then(function(response) {
      console.log(response.data)
      this.tag = response.data
    }.bind(this));
  },
  methods: {
    route: function(new_tag) {
      // router.push("/tags/" + new_tag.id)
      axios.get("/tags/" + new_tag.id).then(function(response) {
        console.log(response.data)
        this.tag = response.data
      }.bind(this));
    },
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true
      } else {
        return false
      }
    },
    setCurrentPost: function(post) {
      this.currentPost = post;
      console.log(this.currentPost);
    },
    hideModal: function() {
      $('#exampleModal').modal('hide');
    },
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          console.log(response.data.jwt)
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          axios.get("/users/me").then(function(response) { localStorage.setItem("user_id", response.data.id);
          }.bind(this));
          console.log(localStorage)
          $('#exampleModal').modal('hide');
          router.push("/tags/" + tag.id);
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

// ACCOUNTS
var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: []
    };
  },
  created: function() {},
  methods: {
    submit: function() {
      var params = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      };
      axios
        .post("/users", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};
var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          console.log(response.data.jwt)
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          axios.get("/users/me").then(function(response) { localStorage.setItem("user_id", response.data.id);
          }.bind(this));
          console.log(localStorage)
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};
var LogoutPage = {
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};

// PROFILE
var ProfileShowPage = {
  template: "#profile-show-page",
  data: function() {
    return {
      user: {}
    };
  },
  created: function() {
    axios.get("/users/me").then(function(response) {
      console.log(response.data);
      this.user = response.data;
    }.bind(this));
  },
  methods: {}
};
var ProfileEditPage = {
  template: "#profile-edit-page",
  data: function() {
    return {
      first_name: "",
      last_name: "",
      bio: "",
      profile_picture: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/users/me").then(
      function(response) {
        this.first_name = response.data.first_name;
        this.last_name = response.data.last_name;
        this.bio = response.data.bio;
        this.profile_picture = response.data.profile_picture;
      }.bind(this)
    );
  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.first_name,
        last_name: this.last_name,
        bio: this.bio,
        profile_picture: this.profile_picture
      };
      axios
        .patch("/users/" + this.$route.params.id, params)
        .then(function(response) {
          router.push("/profile")
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    deleteUser: function() {
      axios.delete("/users/:id").then(function(response) {
        var index = this.users.indexOf(user);
        this.users.splice(index, 1);
      }.bind(this));
      router.push("/login")
    }
  }
};

// POSTS
var PostsNewPage = {
  template: "#posts-new-page",
  data: function() {
    return {
      title: "",
      pitch: "",
      body: "",
      seeking: "",
      tag_ids: [],
      tags: [],
      errors: []
    };
  },
  created: function() {
    axios.get("/tags/").then(function(response) {
      console.log(response.data)
      this.tags = response.data
    }.bind(this));
  },
  methods: {
    submit: function() {
      var params = {
        title: this.title,
        pitch: this.pitch,
        body: this.body,
        seeking: this.seeking,
        tag_ids: this.tag_ids
      };
      axios
        .post("/posts", params)
        .then(function(response) {
          router.push("/")
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this))
    }
  },
  computed: {}
};
var PostsShowPage = {
  template: "#posts-show-page",
  data: function() {
    return {
      post: {},
      user: {}
    };
  },
  created: function() {
    axios.get("/posts/" + this.$route.params.id).then(function(response) {
      console.log(response.data)
      this.post = response.data
    }.bind(this));
    // this.user_id = localStorage.user_id
    axios.get("/users/me").then(function(response) {
      console.log(response.data);
      this.user = response.data;
    }.bind(this));
  },
  methods: {}
};
var PostsEditPage = {
  template: "#posts-edit-page",
  data: function() {
    return {
      post: {},
      tag_ids: [],
      tags: [],
      errors: []
    };
  },
  created: function() {
    axios.get("/posts/" + this.$route.params.id).then(function(response) {
      this.post = response.data;
    }.bind(this))
    axios.get("/tags/").then(function(response) {
      console.log(response.data)
      this.tags = response.data
    }.bind(this));
  },
  methods: {
    submit: function() {
      var params = {
        title: this.post.title,
        pitch: this.post.pitch,
        body: this.post.body,
        seeking: this.post.seeking,
        tag_ids: this.tag_ids
      };
      axios
        .patch("/posts/" + this.$route.params.id, params)
        .then(function(response) {
          router.push("/profile")
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    deletePost: function() {
      axios.delete("/posts/" + this.$route.params.id).then(function(response) {
        var index = this.users.indexOf(user);
        this.users.splice(index, 1);
      }.bind(this));
      router.push("/posts")
    }
  }
};

// Framework
var router = new VueRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/signup", component: SignupPage },
    { path: "/login", component: LoginPage },
    { path: "/logout", component: LogoutPage },
    { path: "/profile", component: ProfileShowPage },
    { path: "/profile/edit", component: ProfileEditPage },
    { path: "/posts/new", component: PostsNewPage },
    { path: "/posts/:id", component: PostsShowPage },
    { path: "/posts/:id/edit", component: PostsEditPage },
    { path: "/tags/:id", component: TagsShowPage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  },
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true
      } else {
        return false
      }
    }
  }
});