/**
 *  @author https://codepen.io/bookmarklets
 *  @file Direct Video Download from Reddit Video<br><i class="gray">Old or New Reddit. Uses jQuery to grab URL - right click to download!</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:var json_obj;
	$.getJSON('.json', function (data) {
	    json_obj = data;
	});
	str = (JSON.stringify(json_obj));
	var start_pos = str.indexOf('fallback_url') + 1;
	var end_pos = str.indexOf('?',start_pos);
	var text_to_get = str.substring(start_pos,end_pos);
	var vidSource= text_to_get.replace('allback_url':'','');
	     window.open(vidSource);