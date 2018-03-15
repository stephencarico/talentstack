/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};

// Account actions
var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
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
        password_confirmation: this.passwordConfirmation
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
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
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

// User actions
var UsersShowPage = {
  template: "#user-show-page",
  data: function() {
    return {
      user: {},
      currentPost: {}
    };
  },
  created: function() {
    axios.get("/users/" + this.$route.params.id).then(function(response) {
      console.log(localStorage.jwt)
      console.log(response.data);
      this.user = response.data;
    }.bind(this));
  },
  methods: {}
};

var UsersEditPage = {
  template: "#user-edit-page",
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
    axios.get("/users/" + this.$route.params.id).then(
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
        .patch("/users/:id", params)
        .then(function(response) {
          router.push("/users")
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

// Post actions
var PostsNewPage = {
  template: "#posts-new-page",
  data: function() {
    return {
      title: "",
      body: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        title: this.title,
        body: this.body
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

var PostsIndexPage = {
  template: "#posts-index-page",
  data: function() {
    return {
      posts: []
    };
  },
  created: function() {
    axios.get("/posts").then(function(response) {

      this.posts = response.data
      console.log(response.data)
    }.bind(this))
  },
  methods: {},
  computed: {}
};

var PostsShowPage = {
  template: "#posts-show-page",
  data: function() {
    return {
      post: {}
    };
  },
  created: function() {
    axios.get("/posts/" + this.$route.params.id).then(function(response) {
      console.log(response.data)
      this.post = response.data
    }.bind(this))
  },
  methods: {}
};

var PostsEditPage = {
  template: "#posts-edit-page",
  data: function() {
    return {
      post: {},
      errors: []
    };
  },
  created: function() {
    axios.get("/posts/" + this.$route.params.id).then(function(response) {
      this.post = response.data;
    }.bind(this))
  },
  methods: {
    submit: function() {
      var params = {
        title: this.title,
        body: this.body
      };
      axios
        .patch("/posts/" + this.$route.params.id, params)
        .then(function(response) {
          router.push("/posts/:id")
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    setCurrentPost: function(post) {
      this.currentPost = post;
      console.log(this.currentPost);
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
    { path: "/users", component: UsersShowPage },
    { path: "/users/edit", component: UsersEditPage },
    { path: "/posts", component: PostsIndexPage },
    { path: "/posts/new", component: PostsNewPage },
    { path: "/posts/:id", component: PostsShowPage },
    { path: "/posts/:id/edit", component: PostsEditPage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});