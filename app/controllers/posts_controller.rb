class PostsController < ApplicationController

  before_action :authenticate_user, except: [:index, :show]

  def index 
    posts = Post.all.order(id: :asc)
    render json: posts.as_json
  end

  def show
    post = Post.find_by(id: params[:id])
    render json: post.as_json
  end

  def create
    post = Post.new(
      user_id: current_user.id,
      title: params[:title],
      pitch: params[:pitch],
      body: params[:body],
      seeking: params[:seeking]
      )
    if post.save
      params[:tag_ids].each do |tag_id|
        post_tag = PostTag.create(
          post_id: post.id,
          tag_id: tag_id
        )
      end
      render json: {message: 'Post created successfully'}, status: :created
    else
      render json: {errors: post.errors.full_messages}, status: :bad_request
    end
  end

  def update
    post = Post.find_by(id: params[:id])
    post.title = params[:title] || post.title
    post.pitch = params[:pitch] || post.pitch
    post.body = params[:body] || post.body
    post.seeking = params[:seeking] || post.seeking
    if post.save
      render json: {message: 'Post updated successfully'}, status: :created
    else
      render json: {errors: post.errors.full_messages}, status: :bad_request
    end
  end

  def destroy
    post = Post.find_by(id: params[:id])
    PostTag.where(post_id: post.id).destroy_all
    post.destroy
    render json: {message: "Post successfully deleted"}
  end
end
