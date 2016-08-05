<?php
require_once('user.class.php');
require_once('site.class.php');
require_once('log.class.php');

if($action[1]=='show')
{

	$lid=getRequest('lid');
	$response=Log::show($lid);
	
	if($response==false)
	{
		handle(ERROR_SYSTEM.'04');
	}
	else 
	{
		handle('0000'.json_encode($response));
	}
	

}
if(!checkAuthority())
	handle(ERROR_PERMISSION.'01');
$nowUser=User::show(Site::getSessionUid());
$nowRoleId=$nowUser[0]['roleId'];

if($action[1]=='list')
{
	$response=Log::list(getRequest('userId'),getRequest('pointId'));
	if($response==false)
	{
		handle(ERROR_SYSTEM.'04');
	}
	else 
	{
		handle('0000'.json_encode($response));
	}
}




if ($action[1]=='new') 
{
	$newLog=new Log;
	$newLog->userId=Site::getSessionUid();

	if( ($response=$newLog->create(getRequest('pointId'),getRequest('courseId'),getRequest('status'))) !=0)
	{
		handle('0000{"cid":'.$response.'}');
	}
	else
	{
		handle(ERROR_SYSTEM.'05');
	}
}

if($action[1]=='renew')
{
	if($nowRoleId>2)
		handle(ERROR_PERMISSION.'01');
	$response=Log::modify(getRequest('cid'),getRequest('name'),getRequest('content'),getRequest('visibility'));
	if($response==false)
	{
		handle(ERROR_SYSTEM.'04');
	}
	else 
	{
		handle('0000');
	}
}
if($action[1]=='delete')
{
	if($nowRoleId>2)
		handle(ERROR_PERMISSION.'01');
	$response=Log::delete(getRequest('cid'));
	if($response==false)
	{
		handle(ERROR_SYSTEM.'04');
	}
	else 
	{
		handle('0000');
	}
}
handle(ERROR_INPUT.'04');

?>