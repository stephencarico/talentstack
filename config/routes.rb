Rails.application.routes.draw do

  get 'home/index'

  resources :posts do 
    resources :comments
  end
  resources :tags
  post 'user_token' => 'user_token#create'
  resources :users
  # QUESTION: can we place users in a v1?

end