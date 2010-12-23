require 'rubygems'
require 'sinatra'
require 'haml'
require 'active_record'
require 'digest/md5'

environment = ENV['DATABASE_URL'] ? 'production' : 'development'
config = YAML.load(File.read('config/database.yml'))
ActiveRecord::Base.establish_connection config[environment]

class Cuorizini < ActiveRecord::Base
  attr_accessible :session_id, :user_agent, :lat, :lng
end

enable :sessions

before do
  session[:id] = session[:id] || Digest::MD5.hexdigest("#{request.user_agent}#{Time.now}#{rand(99999999)}cuorizini")
end

get '/' do
  cuorizini = Cuorizini.first(:select => "SUM(cuorizini_count) AS cuorizini")
  
  @cuorizini_count = cuorizini.cuorizini || 0
  
  haml :index
end

get '/index.html' do
  redirect '/'
end

post '/cuorizino' do
  lat = params[:lat] || nil;
  lng = params[:lng] || nil;
  
  cuorizino = Cuorizini.find_by_session_id(session[:id]) || Cuorizini.new({:session_id => session[:id], :user_agent => request.user_agent, :lat => lat, :lng => lng})
  cuorizino.cuorizini_count = cuorizino.cuorizini_count || 0
  cuorizino.update_attribute(:cuorizini_count, cuorizino.cuorizini_count + 1)
end