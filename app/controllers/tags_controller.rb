class TagsController < ApplicationController

  def index
    tags = Tag.all 
    render json: tags.as_json
  end

  def show
    tag = Tag.find_by(id: params[:id])
    render json: tag.as_json
  end

end
