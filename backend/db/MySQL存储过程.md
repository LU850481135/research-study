**存储过程（Stored Procedure是一种在数据库中存储复杂程序，以便外部程序调用的一种数据库对象
MySQL 5.0 版本开始支持存储过程
存储过程 = 数据库 SQL 语言层面的代码封装与重用**

 - 声明语句结束符 DELIMITER $$ or DELIMITER //
 - 声明存储过程 CREATE PROCEDURE UpdateAuthGroup(in _id int, _rules text)
 - 存储过程开始和结束符号 BEGIN .... END 
 - 变量赋值 SET @p_in=1
 - MySQL存储过程的参数用在存储过程的定义，共有三种参数类型,IN,OUT,INOUT
 - IN 输入参数：表示调用者向过程传入值（传入值可以是字面量或变量）
 - OUT 输出参数：表示过程向调用者传出值(可以返回多个值)（传出值只能是变量）
 - INOUT 输入输出参数：既表示调用者向过程传入值，又表示过程向调用者传出值（值只能是变量）

```
drop procedure if exists UpdateAuthGroup;
delimiter //
 create procedure UpdateAuthGroup(in _id int, _rules text)
    begin
        update dzm_his_auth_group set rules = _rules where id = _id;
    end //
delimiter;
```
```
// 调用
call UpdateAuthGroup(8, '4');
```

```
drop procedure if exists CreateNewHospital;
delimiter //
 create procedure CreateNewHospital(inout NewHospital varchar(50), HospitalOwner varchar(20))
    begin
        select count(*) + 1 as next_hid from `dzm_his_hospital`;
        set hid = next_hid;
        insert into `dzm_his_hospital` (
					`hospital_name`, `create_time`, `update_time`, `hid`, `owner_name`
				) values (
					NewHospital, unix_timestamp(now()), unix_timestamp(now()),
					hid, HospitalOwner
				);
        insert into `dzm_his_wxmp` (
					`id`, `userid`, `access_token_expires`, `jsapi_ticket_expires`
				) values (
					hid, hid, '0', '0'
				);
        update `dzm_his_member` set `p_id` = hid where `uid` = 2;
    end //
delimiter;

call CreateNewHospital('hospital', 'admin');
```
