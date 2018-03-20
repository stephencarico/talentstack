class Tag < ApplicationRecord
  has_many :post_tags
  has_many :posts, through: :post_tags

  def as_json
    {
      id: id,
      title: title,
      posts: posts.as_json
    }
  end
end
