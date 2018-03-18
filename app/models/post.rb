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
end
