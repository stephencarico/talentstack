class PostTagsController < ApplicationController

  # There will be no user interface to connect posts&tags
  # def create
  #   post_tag = PostTag.create(
  #     post_id: params[:post_id],
  #     tag_id: params[:tag_id]
  #   )
  # end
  # User flow: In posts/create, user will fill form field
  # that requests to enter tag.
  # QUESTION: How do we work around the need for post id
  # after creation?

end
