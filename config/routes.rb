Rails.application.routes.draw do

  # USERS
  post 'user_token' => 'user_token#create'
  post "/users" => "users#create"
  get "/users/:id" => "users#show"
  patch "/users/:id" => "users#update"
  delete "/users/:id" => "users#destroy"

  # POSTS


  # COMMENTS


  # TAGS


end