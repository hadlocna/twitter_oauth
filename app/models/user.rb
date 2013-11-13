class User < ActiveRecord::Base
  has_many :tweets
  def tweet(status)
    p '----inside tweet--------'
    tweet = tweets.create!(:status => status)
    TweetWorker.perform_async(tweet.id)
  end
end
