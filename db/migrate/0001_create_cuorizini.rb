class CreateCuorizini < ActiveRecord::Migration
  def self.up
    create_table :cuorizinis do |t|
      t.string :session_id
      t.string :user_agent
      t.integer :cuorizini_count, :default => 0
      t.timestamp :created_at
    end
    
    add_index :cuorizinis, :session_id
  end

  def self.down
    remove_index :cuorizinis, :session_id
    
    drop_table :cuorizinis
  end
end