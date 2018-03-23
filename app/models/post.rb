class Post < ApplicationRecord
  belongs_to :user
  has_many :comments
  has_many :post_tags
  has_many :tags, through: :post_tags
  has_many :images

  validates :title, presence: true, uniqueness: true, length: {in: 1..50}
  validates :pitch, presence: true, length: {in: 10..250}
  validates :body, presence: true
  validates :seeking, presence: :true

  def simple_tags
    simple_tags = []
    tags.each do |tag|
      simple_tags << {id: tag.id, title: tag.title}
    end
    return simple_tags
  end

  def as_json
    {
      id: id,
      user_id: user_id,
      title: title,
      pitch: pitch,
      body: body,
      seeking: seeking,
      tags: simple_tags,
      comments: comments.as_json
    }
  end
end
