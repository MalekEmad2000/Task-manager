CREATE SCHEMA `taskmanagmentsystem`;

CREATE TABLE `taskmanagmentsystem`.`users` (
  `userId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) VISIBLE,
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC) VISIBLE);

--------------------------------------------------------------

CREATE TABLE `taskmanagmentsystem`.`task` (
  `taskid` INT NOT NULL AUTO_INCREMENT,
  `userid` INT UNSIGNED NOT NULL,
  `due_date` DATE NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(1024) NOT NULL,
  `status` VARCHAR(255) NOT NULL,
  `priority`VARCHAR(255) NOT NULL,
  PRIMARY KEY (`taskid`),
  FOREIGN KEY (`userid`) references `users`(`userId`)
  );

  ------------------------------------------------------------

  CREATE TABLE `taskmanagmentsystem`.`tasksassigned` (
  `userid1` INT UNSIGNED NOT NULL ,
  `userid2` INT UNSIGNED NOT NULL,
  `taskid` INT NOT NULL,
  PRIMARY KEY (`userid1`,`userid2`,`taskid`),
  FOREIGN KEY (`userid1`) references `users`(`userId`),
  FOREIGN KEY (`userid2`) references `users`(`userId`),
  FOREIGN KEY (`taskid`) references `task`(`taskid`)
  );


