Rails.application.routes.draw do

  get 'home/index'

  resources :posts do 
    resources :comments
  end

  resources :tags
  post 'user_token' => 'user_token#create'
  resources :users

end

# --------------------------- RAILS ROUTES: ------------------------------- 
# home_index GET    /home/index(.:format)                  home#index
# post_comments GET    /posts/:post_id/comments(.:format)     comments#index
#               POST   /posts/:post_id/comments(.:format)     comments#create
#  post_comment GET    /posts/:post_id/comments/:id(.:format) comments#show
#               PATCH  /posts/:post_id/comments/:id(.:format) comments#update
#               PUT    /posts/:post_id/comments/:id(.:format) comments#update
#               DELETE /posts/:post_id/comments/:id(.:format) comments#destroy
#         posts GET    /posts(.:format)                       posts#index
#               POST   /posts(.:format)                       posts#create
#          post GET    /posts/:id(.:format)                   posts#show
#               PATCH  /posts/:id(.:format)                   posts#update
#               PUT    /posts/:id(.:format)                   posts#update
#               DELETE /posts/:id(.:format)                   posts#destroy
#          tags GET    /tags(.:format)                        tags#index
#               POST   /tags(.:format)                        tags#create
#           tag GET    /tags/:id(.:format)                    tags#show
#               PATCH  /tags/:id(.:format)                    tags#update
#               PUT    /tags/:id(.:format)                    tags#update
#               DELETE /tags/:id(.:format)                    tags#destroy
#    user_token POST   /user_token(.:format)                  user_token#create
#         users GET    /users(.:format)                       users#index
#               POST   /users(.:format)                       users#create
#          user GET    /users/:id(.:format)                   users#show
#               PATCH  /users/:id(.:format)                   users#update
#               PUT    /users/:id(.:format)                   users#update
#               DELETE /users/:id(.:format)                   users#destroy
