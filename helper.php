<?php
	$content = file_get_contents_utf8("http://www.medien.ifi.lmu.de/cgi-bin/search.pl?all:all:all:all:all");
	echo $content;


	function file_get_contents_utf8($fn) {
		if(@file_get_contents($fn)!= false){
     	$content = file_get_contents($fn);
      return mb_convert_encoding($content, 'UTF-8', mb_detect_encoding($content, 'UTF-8, ISO-8859-1', true));
		}
		else {
			return false;
		}
	}
?>
