class CommentsController < ApplicationController
  def index
    comments = Comment.all 
    render json: comments.as_json
  end

  def show
    comment = Comment.find_by(id: params[:id])
    render json: comment.as_json
  end
end
