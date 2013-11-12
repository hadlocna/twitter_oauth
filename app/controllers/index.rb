enable :sessions

get '/' do
  erb :index
end

get '/sign_in' do
  # the `request_token` method is defined in `app/helpers/oauth.rb`
  redirect request_token.authorize_url
end

get '/sign_out' do
  session.clear
  redirect '/'
end

get '/auth' do
  @access_token = request_token.get_access_token(:oauth_verifier => params[:oauth_verifier])
  # our request token is only valid until we use it to get an access token, so let's delete it from our session
  session.delete(:request_token)
  session[:token] = @access_token.token
  session[:secret] = @access_token.secret
  user = User.create(oauth_token: @access_token.token , oauth_secret: @access_token.secret)
  erb :index

end

post '/tweet' do
  tweet = client.update(params[:tweet_text])
  if request.xhr?
  tweet.text.to_json
  else
  redirect '/'
  end
end
