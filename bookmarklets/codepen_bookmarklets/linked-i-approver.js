/**
 *  @author https://codepen.io/bookmarklets
 *  @file Bulk approver for managers of LinkedIn Groups<br><i class="gray">Bulk approves every applicant to a group - beware of spammers!</i>
 *  Original Source {@link https://cdpn.io/bookmarklets/fullpage/NobJbq#}
 */

javascript:(function(){var q=[];$('.groups-manage-group-admin-actions__primary-action').each(function(){var that=this;var f=function(index){$(that).trigger('click');$(that).trigger('mousedown'); setTimeout(function(){if(q[index]){q[index](index+1);}else{if(upVoteTimer){window.clearTimeout(upVoteTimer);}}},500);};q.push(f);}); var upVoteTimer=window.setTimeout(function(){q[0](1);},50);}());