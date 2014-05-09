set :application, "ASF Node"
set :repository,  "git@github.com:cjmarkham/asimpleforum-node.git"
set :keep_releases, 3

# set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`
set :user, "root"

server "162.243.173.39", :app, :web, :db, :primary => true
set :deploy_to, "/var/www/asimpleforum-node"
set :branch, fetch(:branch, "master")

 namespace :deploy do
   task :start do ; end
   task :stop do ; end
   task :restart, :roles => :app, :except => { :no_release => true } do
     run "ln -s #{shared_path}/local.js #{current_path}/config/local.js"
   	 run "ln -s #{shared_path}/node_modules #{current_path}/node_modules"
   end
  end

after "deploy", "deploy:cleanup" 