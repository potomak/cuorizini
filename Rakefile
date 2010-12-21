require 'rubygems'
require 'yaml'
require 'active_record'

desc "Load environment configuration"
task :environment do
  environment = ENV['DATABASE_URL'] ? 'production' : 'development'
  config = YAML::load(File.open('config/database.yml'))[environment]
  puts config.inspect
  ActiveRecord::Base.establish_connection(config)
end

namespace :db do
  desc "Migrate the database"
  task(:migrate => :environment) do
    ActiveRecord::Base.logger = Logger.new(STDOUT)
    ActiveRecord::Migration.verbose = true
    ActiveRecord::Migrator.migrate("db/migrate")
  end
end