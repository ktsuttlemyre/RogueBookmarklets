/**
 *  @author https://codepen.io/bookmarklets
 *  @file Image Combo Tool<br><i class="gray">One tool will reverse image search in Bing, Tineye or Google as well as extract EXIF data</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:  if(document.getElementById('mymenu')) { 
	document.getElementById('mymenu').remove(); 
	}else{ 
	function hideMenu() { document.getElementById('mymenu').remove(); } var url=location.href; var ext = url.split('.').pop(); if(ext.includes('jpg' || 'png' || 'gif' || 'jpeg') !==true) { alert('Selected URL does not have an image extension (PNG|JPG|JPGE|GIF).\nOpen the image you want to search in its own window.\Attempting anyway...'); } var block_to_insert ; var container_block ; var goog = '<a target=_blank href=https://www.google.com/searchbyimage?&image_url=' + window.location.href + '> Google Reverse Image Search</a>'; var bing = '<a target=_blank href=http://www.bing.com/images/searchbyimage?cbir=sbi&imgurl=' + window.location.href + '> Bing Reverse Image Search</a>'; var exif = '<a target=_blank href=http://metapicz.com/#landing?imgsrc=' + window.location.href + '>EXIF Data Extraction   ① </a>'; 
	var jeff ='<a target=_blank href=http://exif.regex.info/exif.cgi?url=' + window.location.href + '>③</a>'; 
	var tineye = '<a target=_blank href=http://tineye.com/search?pluginver=bookmark_1.0&url=' + window.location.href + '> Tineye Reverse Image Search</a>'; 
	var karma= '<a target=_blank href=http://karmadecay.com/' + window.location.href + '> KarmaDecay Reddit Image Search</a>'; 
	function information(){alert('This tool is designed to work on a single image.\nONE IMAGE PER PAGE!\nOpen just one image at a time in a new tab.')};
	var info = '<a href=# onclick=information() style=text-decoration:none title=One image at a time please!>ⓘ</a>';
	var I = document.getElementsByTagName('IMG')[0];
	var sizer='Image size is: ' + I.naturalWidth+ 'px wide x ' +I.naturalHeight + 'px high\nFileType: ' + fileType + '\nSource: ' + I.src;
	var res = url.split('?');
	var extArray = ext.split('?');
	var fileType = (extArray[0]);
	var exifDataQuery=(res[0]);
	var exifDataCom='<form id=duh name=duh action=http://exifdata.com/exif.php method=post target=_blank style=display:inline>
	<input style=display:inline type=hidden value=' + exifDataQuery + ' name=picurl>
	<a href=# onclick=document.getElementById(\'duh\').submit();>②</a></form>';
	block_to_insert = document.createElement('div'); block_to_insert.id = 'mymenu'; block_to_insert.innerHTML = '<a href=# style=text-decoration:none;color:red title=Close onClick=hideMenu()>   × </a>    Image Operations:<br /><center><table><tr><td><img src=http://google.com/favicon.ico height=20></td><td> 1.) </td><td>'+ goog+ '</td><td> </td></tr><tr><td><img src=http://bing.com/favicon.ico height=20></td><td> 2.) </td><td>' + bing + '</td><td> </td></tr><tr><td><img src=https://tineye.com/favicon.ico height=20 /></td><td> 3.) </td><td>' + tineye + '</td><td> </td></tr><tr><td><img src=http://karmadecay.com/favicon.ico height=20 /></td><td> 4.) </td><td>' + karma + '</td><td> </td></tr><tr><td><img src=https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/03/8e/e5/038ee5ec-979e-ddf1-92d1-5e77a3931ad1/AppIcon.png/1200x630bb.png height=20></td><td> 5.) </td><td>' + exif + '   ' + exifDataCom + '   ' + jeff +'</td><td> </td></tr><tr><td> ⇅</td><td> 6.) </td><td><a href=# onclick=alert(sizer)>Size of Image</a></td><td>   ' + info + '</td></tr></table>'; container_block = document.getElementsByTagName('body')[0]; container_block.appendChild(block_to_insert); mymenu.setAttribute('style', 'margin-left:auto; margin-right:auto; height:170px; width:25%; background-color:#FFFF00; border-radius:25px; border:2px solid #ff0000; color:black; float:left; font-family:arial,sans,verdana; font-size:20px; z-index:10000; display: inline-block;line-height:unset!important; line-height:1!important; overflow:visible; box-shadow: 1px 1px #000; position:fixed; top: 0; padding:2px 5px;');mymenu.setAttribute('tabindex', '0');mymenu.setAttribute('onBlur', 'hideMenu()');
	};