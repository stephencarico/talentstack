class UsersController < ApplicationController

  def index
    users = User.all
    render json: users.as_json
  end

  def create
    user = User.new(
      first_name: params[:first_name],
      last_name: params[:last_name],
      email: params[:email],
      password: params[:password],
      password_confirmation: params[:password_confirmation]
    )
    if user.save
      render json: {message: 'User created successfully'}, status: :created
    else
      render json: {errors: user.errors.full_messages}, status: :bad_request
    end
  end

  def show
    if params[:id] == "me"
      user = current_user
    else
      user = User.find_by(id: params[:id])
    end

    render json: user.as_json
  end

  def update
    user = current_user
    user.first_name = params[:first_name] || user.first_name
    user.last_name = params[:last_name] || user.last_name
    user.bio = params[:bio] || user.bio
    user.profile_picture = params[:profile_picture] || user.profile_picture
    user.save
    if user.save
      render json: {message: 'User updated successfully'}, status: :created
    else
      render json: {errors: user.errors.full_messages}, status: :bad_request
    end
  end

  def destroy
    user = current_user
    user.destroy
    render json: {message: "User successfully deleted"}
  end

end
