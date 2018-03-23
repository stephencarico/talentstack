class CommentsController < ApplicationController
  def index
    comments = Comment.all 
    render json: comments.as_json
  end

  def show
    comment = Comment.find_by(id: params[:id])
    render json: comment.as_json
  end

  def create
    comment = Comment.new(
      user_id: current_user.id,
      post_id: params[:post_id],
      body: params[:body]
      )
    if comment.save
      render json: {message: 'Comment created successfully'}, status: :created
    else
      render json: {errors: comment.errors.full_messages},
      status: :bad_request
    end
  end

  def destroy
    comment = Comment.find_by(id: params[:id])
    comment.destroy
    render json: {message: "Comment successfully deleted"}
  end
end
