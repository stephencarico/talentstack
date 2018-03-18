/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      tags: {},
      currentTag: {},
      posts: []
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
    setCurrentTag: function(tag) {
      this.currentTag = tag;
      console.log(this.currentTag)
    }
  },
  computed: {}
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
          router.push("/profile");
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

// USERS
var UsersShowPage = {
  template: "#user-show-page",
  data: function() {
    return {
      user: {}
    };
  },
  created: function() {
    // axios.get("/users/" + localStorage.user_id).then(function(response) {
    //   console.log(response.data);
    //   this.user = response.data;
    // }.bind(this));
    axios.get("/users/me").then(function(response) {
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
        title: this.post.title,
        pitch: this.post.pitch,
        body: this.post.body,
        seeking: this.post.seeking
      };
      axios
        .patch("/posts/" + this.$route.params.id, params)
        .then(function(response) {
          router.push("/posts")
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
    { path: "/profile", component: UsersShowPage },
    { path: "/profile/edit", component: UsersEditPage },
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