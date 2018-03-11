class User < ApplicationRecord
  has_many :posts
  has_many :comments

  has_secure_password
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true

  def as_json
    {
      first_name: first_name,
      last_name: last_name,
      bio: bio,
      posts: posts.map { |post| post }
    }
  end
end
