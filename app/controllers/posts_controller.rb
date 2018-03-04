class PostsController < ApplicationController

  def index 
    posts = Post.all
    render json: posts.as_json
  end

  def show
    post = Post.find_by(id: params[:id])
    render json: post.as_json
  end
end
