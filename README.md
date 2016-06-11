# Journal

Journal is a minimal responsive theme for [Ghost](http://github.com/tryghost/ghost/) which focus on content and features syntax highlighter from [Prism](http://prismjs.com/).

![Journal](https://raw.githubusercontent.com/namdau/journal/master/screenshot.png)

## Getting Started
You'll need to have `npm` (bundled with [node](https://nodejs.org/)) and [gulp](http://gulpjs.com/) installed and follow these steps to clone the repository, install all necessary packages and build the assets:


	cd /your-ghost-blog/content/themes
	git clone https://github.com/namdau/journal
	cd /your-ghost-blog/content/themes/journal
	gulp build
	

## Configuration
### Social links
Open `default.hbs` and replace these links with your social links
	
	<li><a href="#">Github</a></li>
	<li><a href="#">Twitter</a></li>
	<li><a href="#">Linkedin</a></li>

Open `navigation.hbs` and replace these links with your social links
	
	<li><a href="#"><i class="fa fa-github"></i></a></li>
	<li><a href="#"><i class="fa fa-twitter"></i></a></li>
	<li><a href="#"><i class="fa fa-linkedin"></i></a></li>
	
### Google Analytics
Open `default.hbs` and find this line

	ga('create','UA-XXXXX-X','auto');ga('send','pageview');
	
Replace `UA-XXXXX-X` with your Google Analytics IDx 

### Disqus
Open `post.hbs` and find this line

	var disqus_shortname = 'example_shortname';
	
Replace `example_shortname` with your Disqus shortname

## Copyright & License
[MIT license](LICENSE)