/* global Vue, VueRouter, axios */

// MAIN WEBSITE
var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      tags: {},
      posts: [],
      users: [],
      currentPost: {},
      email: "",
      password: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/tags/").then(function(response) {
      this.tags = response.data
    }.bind(this));
    axios.get("/posts/").then(function(response) {
      this.posts = response.data
    }.bind(this));
    axios.get("/users").then(function(response) {
      this.users = response.data
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
    },
    hideModal: function() {
      $('#postModal').modal('hide');
    },
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
          axios.get("/users/me").then(function(response) { localStorage.setItem("user_id", response.data.id);
          }.bind(this));
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
      users: [],
      tag: {},
      currentPost: {},
      email: "",
      password: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/tags/").then(function(response) {
      this.tags = response.data
    }.bind(this));
    axios.get("/tags/" + this.$route.params.id).then(function(response) {
      this.tag = response.data
    }.bind(this));
    axios.get("/users").then(function(response) {
      this.users = response.data
    }.bind(this));
  },
  methods: {
    route: function(new_tag) {
      // router.push("/tags/" + new_tag.id)
      axios.get("/tags/" + new_tag.id).then(function(response) {
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
    },
    hideModal: function() {
      $('#postModal').modal('hide');
    },
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
          axios.get("/users/me").then(function(response) { localStorage.setItem("user_id", response.data.id);
          }.bind(this));
          $('#postModal').modal('hide');
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
var UsersShowPage = {
  template: "#users-show-page",
  data: function() {
    return {
      user: {},
      posts: []
    }
  },
  created: function() {
    axios
      .get("/users/" + this.$route.params.id).then(function(response) {
        this.user = response.data;
      }.bind(this));
    axios.get("/posts/").then(function(response) {
      this.posts = response.data
    }.bind(this));
  },
  methods: {
  },
}

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
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          axios.get("/users/me").then(function(response) { localStorage.setItem("user_id", response.data.id);
          }.bind(this));
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
      formData: {},
      errors: []
    };
  },
  created: function() {
    axios.get("/users/me").then(
      function(response) {
        this.first_name = response.data.first_name;
        this.last_name = response.data.last_name;
        this.bio = response.data.bio;
      }.bind(this)
    );
  },
  methods: {
    uploadFile: function(event) {
      if (event.target.files.length > 0) {
        formData = new FormData();
        formData.append("profile_picture", event.target.files[0]);
      }
    },
    submit: function() {
      var params = {
        first_name: this.first_name,
        last_name: this.last_name,
        bio: this.bio
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
      axios
        .patch("/users/" + this.$route.params.id, formData)
        .then(function(response) {
          // event.target.value = "";
          formData = {}
        }.bind(this));
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
      image: "",
      tag_ids: [],
      tags: [],
      errors: []
    };
  },
  created: function() {
    axios.get("/tags/").then(function(response) {
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
        image: this.image,
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
      user: {},
      users: [],
      comments: [],
      comment_body: "",
      comment_errors: []
    };
  },
  created: function() {
    axios.get("/posts/" + this.$route.params.id).then(function(response) {
      this.post = response.data;
      this.comments = response.data.comments;
    }.bind(this));
    axios.get("/users/me").then(function(response) {
      this.user = response.data ? response.data : '';
      console.log(this.user)
    }.bind(this));
    axios.get("/users").then(function(response) {
      this.users = response.data;
    }.bind(this));
  },
  methods: {
    submit: function() {
      var params = {
        body: this.comment_body,
        post_id: this.post.id
      };
      axios
        .post("/posts/" + this.post.id + "/comments", params)
        .then(function(response) {
          this.comments.push(response.data)
          this.comment_body = "";
        }.bind(this))
        .catch(
          function(error) {
            // this.comment_errors = error;
            // console.log(error)
          }.bind(this)
        );
    },
    deleteComment: function(comment) {
      axios.delete("/posts/" + this.post.id + "/comments/" + comment.id).then(function(response) {
        var index = this.comments.indexOf(comment);
        this.comments.splice(index, 1);
      }.bind(this));
    }
  }
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
      this.tag_ids = response.data.tags.map( tag => tag.id )
    }.bind(this))
    axios.get("/tags/").then(function(response) {
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
        image: this.post.image,
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
      $('#deletePostModal').modal('hide');
      router.push("/profile")
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
    { path: "/users/:id", component: UsersShowPage },
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