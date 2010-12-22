require 'rubygems'
require 'sinatra'
require 'haml'

get '/' do
  @cuorizini = `cat db.txt`.to_i
  haml :index
end

get '/index.html' do
  redirect '/'
end

get '/cuorizino' do
  @cuorizini = `cat db.txt`.to_i
  diff = 1
  begin
    diff = Time.now - Time.parse(`stat db.txt -c %y`)
  rescue ArgumentError
  end
  hearts = params['egg'].to_i
  if diff > 0.2 && (hearts == 1 || hearts == 25)
    @cuorizini += hearts
    `echo #{@cuorizini} > db.txt`
  else
    # TODO: Cheating... ban client?
  end
  haml :cuorizino
end

