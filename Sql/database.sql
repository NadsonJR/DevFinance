create database devFinance;

use devFinance;

Create Table person(
    idperson int auto_increment,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status Char(1) NOT NULL,
    CONSTRAINT PK_person PRIMARY KEY (idperson)
);

Create Table Transaction
(
	idperson INT NOT NULL,
    idtransaction int,
    description VARCHAR(255),
    value VARCHAR(255),
    date Date,
    CONSTRAINT PK_transaction PRIMARY KEY (idtransaction),
    CONSTRAINT FK_idperson FOREIGN KEY (idperson) references person(idperson)
);

select *from person;
Select * from Transaction;

insert INTO Person VAlues ('','Antonio Nadson', 'nadsonjunior@live.com','123','1');