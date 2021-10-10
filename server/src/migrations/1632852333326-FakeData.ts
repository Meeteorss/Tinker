import {MigrationInterface, QueryRunner} from "typeorm";

export class FakeData1632852333326 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('9ae7cbaa-d6a1-4bbf-89c9-9ef52a7662dd', 'Beth', 'Dumpleton', 'bdumpleton0@google.com.au', 'B7g0Zzve4', '401-508-8477', 'Tigil’', 'Plumber', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 186, 'Day', 92, 295, 1.8);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('f5d81502-2860-4f7c-a0dc-6a46dda2022c', 'Rudd', 'Rupel', 'rrupel1@techcrunch.com', '7VcpFtZ5h', '698-598-8996', 'Coromoro', 'Developper', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 379, 'Task', 51, 56, 2.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('3e7a2774-e84d-4b87-bae5-08b883e84e6c', 'Mac', 'Bernaciak', 'mbernaciak2@tamu.edu', 'RVmnFvKCBfw', '330-950-8078', 'Qianpai', 'Plumber', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 787, 'Day', 402, 957, 3.5);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('80f0a5f3-7fde-4cf3-8b3d-23d8aa5ad2a7', 'Madeline', 'Sauniere', 'msauniere3@ebay.co.uk', 'whX6hUuLrC', '845-870-3913', 'Zibreira', 'Editor', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 98, 'Task', 642, 184, 4.3);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('8eba486a-513a-4d38-890d-86c4d8c72a8c', 'Paulie', 'Baggot', 'pbaggot4@wix.com', 'AlcZtcE4n', '338-643-2856', 'Mường Nhé', 'Electrician', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.

Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 311, 'Week', 546, 578, 1.8);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('0db739e1-739b-49a8-bbf6-7e61cdfb41d9', 'Lorraine', 'Cobello', 'lcobello5@sciencedaily.com', 'lIW5wP', '308-978-4385', 'Okhtyrka', 'Chef', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 224, 'Week', 440, 216, 4.6);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('eea24531-2054-40be-83fa-bafa0e9fff66', 'Jeannette', 'Leban', 'jleban6@nasa.gov', 'O9ym9hNRrwQZ', '984-846-8207', 'Timashëvsk', 'Chef', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 223, 'Hour', 472, 369, 3.0);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('2509d597-4f6d-4c2f-a04f-005cd8bca060', 'Adolf', 'Tunnadine', 'atunnadine7@tuttocitta.it', 'OfrqGa9', '241-214-5739', 'Perm', 'Developper', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 417, 'Day', 292, 227, 3.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('f704ea59-3df3-434d-8891-a8a19c1796e6', 'Trip', 'Follen', 'tfollen8@chron.com', 'TcA5vb0h', '316-158-9578', 'Hluhluwe', 'Electrician', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 883, 'Task', 785, 941, 1.8);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('18afa9b7-6da3-4b43-ac94-736b74457880', 'Trever', 'Britten', 'tbritten9@wix.com', 'pua0hP3fDOd', '926-555-6096', 'Juan N Alvarez', 'Developper', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 501, 'Task', 245, 7, 4.5);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('fb43e1ec-2202-4e42-9e8d-304bdedb8bb4', 'Jeanie', 'Spradbery', 'jspradberya@jimdo.com', 'WO7XDXro7tL', '588-249-6133', 'Terezín', 'Plumber', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.

Fusce consequat. Nulla nisl. Nunc nisl.', 687, 'Hour', 538, 962, 4.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('a802056b-4ec3-435f-ad1f-ff39e2f21770', 'Belinda', 'Leupoldt', 'bleupoldtb@51.la', '4n4hrU', '566-103-3391', 'Minapan', 'Chef', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 546, 'Month', 821, 937, 1.6);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('2ba2d6e7-cf8a-4ec2-804f-9ed6ec6985c8', 'Korella', 'Vondrasek', 'kvondrasekc@addthis.com', 'uIV5v848', '896-648-4691', 'Pābna', 'Editor', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 500, 'Day', 943, 28, 2.1);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('24856bcb-06e0-4b59-960a-5d6dc49f29b6', 'Shirlee', 'Sanham', 'ssanhamd@dailymail.co.uk', '1wMAlU5sz6a', '926-176-7873', 'Białośliwie', 'Electrician', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.

Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.', 228, 'Day', 406, 972, 3.0);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('f2b9c5b3-8405-4b86-902d-7291db06acde', 'Elliott', 'Deave', 'edeavee@nbcnews.com', '3rjfUgmHjTb', '929-637-7962', 'San Francisco', 'Chef', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 92, 'Week', 857, 24, 2.8);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('80f56fd9-df33-45bb-815a-090325629c15', 'Viv', 'Sharram', 'vsharramf@unc.edu', 'pMaojVyIoNIc', '174-103-7875', 'Karnice', 'Electrician', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 376, 'Week', 309, 541, 1.5);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('33cfd577-bd78-42c2-8e57-012522396a47', 'Giraldo', 'Peotz', 'gpeotzg@theglobeandmail.com', '6mzf1jiEa', '885-224-3942', 'Pokrov', 'Editor', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 159, 'Task', 70, 234, 3.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('12a65ddd-f584-4fb6-baa8-8a3889c02100', 'Cullan', 'Hegley', 'chegleyh@nymag.com', '59RkfVHfF94N', '991-784-6377', 'Bayt Yāshūţ', 'Chef', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 892, 'Task', 411, 356, 2.2);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('c3046c07-14db-4050-936e-65827e9ba33f', 'Ingeberg', 'Spacy', 'ispacyi@disqus.com', 'cRgeuGEh', '941-116-3413', 'Brzyska', 'Developper', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 836, 'Week', 749, 500, 1.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('cc9bb92e-956d-4e12-9caa-a8c24b73e483', 'Enrika', 'Hagard', 'ehagardj@illinois.edu', '3ljtQOok5', '499-406-0979', 'Mayanhe', 'Editor', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 205, 'Month', 323, 555, 4.5);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('86b4a24b-7f46-4616-8a41-2ed473803719', 'Goldie', 'Insall', 'ginsallk@huffingtonpost.com', 'wHLMOXLzk', '963-915-8128', 'Kiffa', 'Plumber', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 209, 'Task', 123, 904, 2.5);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('28a580f7-2d96-4e24-b016-69b713ed12b6', 'Nicolai', 'Caldaro', 'ncaldarol@free.fr', 'cMecLstgA', '576-215-4484', 'Vito', 'Plumber', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 79, 'Month', 643, 623, 1.4);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('6c264f8d-75b5-41dd-aa19-fcafec6f3eeb', 'Kizzee', 'Nockells', 'knockellsm@sciencedaily.com', 'LD685q6', '153-264-0386', 'Zhujiapu', 'Developper', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 97, 'Day', 591, 65, 4.4);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('d988228f-7e12-4ee7-806c-b43dfd11b1dc', 'Thatcher', 'Blackadder', 'tblackaddern@icq.com', 'LYTRhLoRrlys', '376-668-3656', 'Campina Grande', 'Electrician', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.

Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', 381, 'Hour', 385, 791, 1.3);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('2084fe3b-e445-4d12-afcc-5247b0f58f35', 'Joshuah', 'Bythell', 'jbythello@miitbeian.gov.cn', 'j4sbGuphp', '153-138-0303', 'Ōmiya', 'Developper', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 820, 'Hour', 820, 842, 1.2);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('d4ab8dd6-7157-4973-ae41-b139fd360d6d', 'Lucien', 'Cavan', 'lcavanp@hhs.gov', '4wvnKRz6p', '915-461-3415', 'El Paso', 'Plumber', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 854, 'Hour', 82, 229, 1.3);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('6771b592-5a63-4c06-a36c-0961b33f92f0', 'Shayna', 'Colpus', 'scolpusq@bloglines.com', '5F71V1iAMxXa', '715-158-1977', 'Cigadung', 'Editor', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 300, 'Week', 147, 250, 3.8);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('124e481c-1af9-43be-94fe-44d188869fc1', 'Beatriz', 'Neles', 'bnelesr@yale.edu', 'AazPtFLp', '310-509-6218', 'Tangyin', 'Editor', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 441, 'Month', 142, 413, 2.4);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('5ce2ff72-2981-4f28-b888-0824c85e6e55', 'Tracie', 'Collough', 'tcolloughs@mayoclinic.com', 'EkdIWrQMy0W', '511-514-1285', 'Antony', 'Plumber', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.

Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 980, 'Task', 238, 925, 1.2);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('737c4c96-82f4-487f-850a-84117d4e05c2', 'Koo', 'Munroe', 'kmunroet@quantcast.com', 'jKC3ITzT', '433-585-0719', 'Melaka', 'Editor', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 892, 'Day', 68, 939, 3.8);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('4e3ea11b-d19e-4e5f-8455-37bf519c27e7', 'Lacy', 'Kunzel', 'lkunzelu@themeforest.net', 'oKI5m4XamYI', '841-513-5155', 'Zhuyeping', 'Chef', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 46, 'Month', 463, 785, 1.3);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('401def92-1090-44f1-ae25-706ea6dfe2b2', 'Cherilyn', 'Jacobowits', 'cjacobowitsv@dedecms.com', 'qJvzA7r5Va', '754-281-8654', 'Liqiao', 'Electrician', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 698, 'Hour', 162, 41, 1.8);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('f8691457-4b21-449d-9f09-e25e070dc40c', 'Garek', 'Skittreal', 'gskittrealw@github.io', 'RlJZ7GUZDpm9', '561-615-1626', 'Porto Seguro', 'Chef', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 831, 'Hour', 896, 38, 2.4);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('0a4bf502-0625-4828-84b8-5de917fc2c33', 'Eyde', 'Ace', 'eacex@goodreads.com', '7nbHt97s4y', '575-417-1518', 'Yokotemachi', 'Chef', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 866, 'Task', 935, 268, 2.1);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('0643af41-7856-4818-8fc1-cb58e0dabe55', 'Ruddie', 'Crouse', 'rcrousey@washingtonpost.com', '1IQODlAR', '556-829-4266', 'Huaqiao', 'Developper', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 183, 'Day', 670, 407, 1.1);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('eda07ad5-6696-488d-bc78-6b90c5f5ece0', 'Stormi', 'Avrahamof', 'savrahamofz@lulu.com', 'o1PGVuABW93', '551-813-9459', 'Kae Dam', 'Plumber', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 687, 'Month', 516, 666, 1.8);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('e54b7c4b-23b2-4f2b-80f6-bf11feacbf06', 'Homerus', 'Wickwar', 'hwickwar10@blog.com', 'SVG63B', '552-684-4849', 'Tandel', 'Electrician', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 185, 'Hour', 277, 308, 4.1);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('d499c457-8d0d-49bf-aa5b-fb4a6d208129', 'Jami', 'Balaam', 'jbalaam11@exblog.jp', '3Ts46BL', '964-981-1911', 'Delvinë', 'Plumber', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 149, 'Day', 720, 348, 2.9);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('e6e9b949-1f57-40e9-8ff6-efd0e53da987', 'Wernher', 'Olpin', 'wolpin12@rediff.com', 'np8pAiszI5JZ', '560-535-3929', 'Francisco J Mujica', 'Chef', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.

Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 324, 'Month', 488, 451, 3.1);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('66e5b046-8356-415d-828d-7a0473dc7896', 'Bette', 'Meale', 'bmeale13@vk.com', 'XTW4g8aMwzN0', '511-328-1259', 'Jistebník', 'Chef', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 293, 'Hour', 948, 894, 2.9);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('726c4961-456e-454a-a7af-5e0eae772f70', 'Carmelina', 'Olland', 'colland14@fema.gov', 'mqVqiGAf', '136-384-5737', 'Ajuy', 'Editor', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 893, 'Week', 41, 23, 4.5);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('1856e34c-ff33-4a4c-8e77-5d75e844faff', 'Terencio', 'Gergely', 'tgergely15@fastcompany.com', 'KQf1nTMuQ', '377-595-0058', 'Vila Nova', 'Developper', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 281, 'Hour', 1000, 994, 4.9);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('ce7da215-59b9-4393-958b-49a262dd26bd', 'Joycelin', 'Flucker', 'jflucker16@buzzfeed.com', 'xoOSujHr', '929-459-0631', 'Pawonków', 'Editor', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 233, 'Week', 368, 39, 1.2);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('9384424a-f7d4-4d40-a5d1-d0cff2efc41b', 'Lorettalorna', 'Ladon', 'lladon17@domainmarket.com', 'JmEqEHgv5Sft', '883-395-0812', 'Basyūn', 'Chef', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 222, 'Month', 344, 266, 2.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('bf636acd-055f-4588-a36b-25a004d8804a', 'Carrie', 'Pook', 'cpook18@omniture.com', '28ApRiBUnU1', '881-143-8363', 'Tasīl', 'Electrician', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 907, 'Month', 962, 579, 2.2);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('61305504-6eb2-4988-89ea-a58053b2ab22', 'Devi', 'Ramsay', 'dramsay19@gov.uk', '0U7kU4e', '410-786-0546', 'Al Ḩudaydah', 'Editor', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 169, 'Week', 401, 665, 3.8);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('f415aa5a-8698-4357-a903-c1aff10f9f4a', 'Emanuele', 'Mathis', 'emathis1a@example.com', 'dMO4fl1WvQ8', '124-386-5000', 'Jiujie', 'Plumber', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 915, 'Task', 441, 801, 2.9);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('019da805-9523-4415-948b-2d94d4105986', 'Chelsie', 'Nizet', 'cnizet1b@wired.com', 'OE6iaV', '272-245-2428', 'Buniaga', 'Plumber', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 116, 'Hour', 970, 48, 1.2);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('5d85357a-e156-467c-83b4-b930432f955e', 'Sampson', 'Orgel', 'sorgel1c@netvibes.com', 'EXzdAku5f5', '775-379-5586', 'Bongued', 'Editor', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 423, 'Day', 41, 155, 1.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('9d92ba55-6189-4bff-95bc-2d4a8a75da29', 'Pauli', 'Stibbs', 'pstibbs1d@ucla.edu', '3IgiIvDIn', '385-593-2564', 'Guifeng', 'Electrician', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.

Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 43, 'Task', 935, 225, 2.0);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('d9a9e103-bdc0-4695-9cf8-ef122b98313a', 'Maye', 'Kille', 'mkille1e@independent.co.uk', 'nyojGxQmF', '592-492-4529', 'Tambalisa', 'Electrician', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 410, 'Day', 630, 44, 1.2);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('92e8d1f9-d45e-4c37-915a-fcd51761840b', 'Alison', 'Crier', 'acrier1f@furl.net', 'R6t8e7aVA', '596-389-9657', 'Dumingag', 'Electrician', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 511, 'Week', 814, 465, 4.0);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('0bfe9643-cb76-4a4a-91d4-68d6139f8289', 'Billi', 'Phair', 'bphair1g@stumbleupon.com', 'U7bDXLM7pg', '521-391-6373', 'Ursus', 'Electrician', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 537, 'Hour', 243, 801, 2.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('9f0c079b-3983-4241-aa66-913f7f7dce08', 'Lola', 'Cowdry', 'lcowdry1h@surveymonkey.com', '9LhPUX9cUf0', '442-269-5454', 'Kertasari', 'Editor', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 485, 'Hour', 239, 513, 3.6);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('df3b7767-0867-4372-ba38-5022a231f2f8', 'Willis', 'Franschini', 'wfranschini1i@icq.com', 'LGGhurFB7Q', '486-867-5553', 'Oebaki', 'Developper', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 359, 'Day', 181, 243, 4.6);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('dcc1f61e-d715-48af-9be1-a97d1edbc43f', 'Chaim', 'Mounce', 'cmounce1j@blog.com', '5iJBX8R', '139-535-8173', 'Burgeo', 'Developper', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 471, 'Week', 345, 736, 3.8);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('1063428a-f403-4e69-89d6-d38cbec114b3', 'Aland', 'De Witt', 'adewitt1k@squidoo.com', 'w7CjhD', '148-841-2715', 'Tantamayo', 'Electrician', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 907, 'Hour', 961, 685, 2.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('1d822fe2-c669-4ca5-85ac-b91e0471b4ce', 'Felix', 'Putson', 'fputson1l@digg.com', '4xupZmFwa8wc', '386-718-2848', 'Daytona Beach', 'Chef', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 552, 'Week', 579, 466, 4.6);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('ddfdc6d9-d4ea-4d82-ab55-20f348224761', 'Ado', 'Hartle', 'ahartle1m@java.com', 'nRgSVRvXljmR', '762-752-6306', 'Boro Utara', 'Electrician', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 433, 'Week', 90, 387, 4.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('9fdea0d0-859d-4d60-9cd6-26e2ec3196dc', 'Teddy', 'Dumbar', 'tdumbar1n@go.com', 'ADWXnudDWjhL', '987-966-1644', 'Qinghe', 'Plumber', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 955, 'Month', 735, 855, 2.3);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('6399dee2-1678-4e2b-b075-cf8534be562c', 'Gerome', 'Ricoald', 'gricoald1o@twitter.com', 'P48PYkM7', '914-930-0746', 'Xishanzui', 'Electrician', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 2, 'Week', 382, 949, 1.2);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('1c58db50-2ca9-4fcf-b48f-c631985c8e98', 'Biron', 'Knights', 'bknights1p@shutterfly.com', 'lzZGhC3IJ', '109-525-8504', 'Lashkar Gāh', 'Electrician', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 54, 'Week', 370, 445, 1.4);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('d37962c1-cb6c-48cf-bcd9-96d3d809e1b5', 'Russ', 'Molohan', 'rmolohan1q@foxnews.com', 'efu0cnH8qF', '333-109-3077', 'Saint-Quentin', 'Chef', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.

Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 960, 'Week', 559, 278, 2.4);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('c7d222a7-5586-4c12-a6e9-0a39fec019a2', 'Randa', 'Hallifax', 'rhallifax1r@facebook.com', 'oG45ASVevOF', '912-903-3667', 'Tornio', 'Chef', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 928, 'Hour', 110, 930, 4.6);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('ef4ae461-0377-447a-8a2b-66d3ff563d64', 'Sianna', 'Kennion', 'skennion1s@guardian.co.uk', '97V2MfeO3', '448-874-6137', 'Karangpawitan', 'Plumber', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 942, 'Day', 60, 785, 3.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('be9ee396-6cba-44cc-8752-f6fde578e170', 'Elonore', 'Mackro', 'emackro1t@moonfruit.com', '6wgSN3s', '864-626-5701', 'Noebana', 'Editor', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 249, 'Hour', 408, 809, 3.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('0b892878-13ef-476b-ac8c-d492a45cd064', 'Lilas', 'Clarycott', 'lclarycott1u@comcast.net', 'VNAiIMHngTi', '758-823-4563', 'San Clemente', 'Plumber', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 473, 'Day', 271, 126, 4.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('811f769a-29d0-4c73-86cd-08ec650e4a33', 'Hendrika', 'Alp', 'halp1v@yahoo.com', 'uIuFVMQwr', '764-513-0886', 'Maubara', 'Developper', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 420, 'Task', 504, 119, 3.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('ba97b558-f456-47ea-a87a-6adde607396b', 'Benyamin', 'McAloren', 'bmcaloren1w@google.it', 'mdYu4gJMGyi', '597-488-3121', 'Xiyang', 'Editor', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 944, 'Hour', 875, 865, 4.5);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('f6f4edd5-fa65-472c-943b-c4d87dc42cb8', 'Debor', 'Ormes', 'dormes1x@walmart.com', 'duJ72VuWiio3', '580-759-6683', 'Donskoy', 'Chef', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 911, 'Task', 598, 543, 1.8);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('ce2c9d89-2076-48f4-8659-b86ff64bc928', 'Hector', 'Hail', 'hhail1y@stumbleupon.com', 'NBIGBJpZi9', '405-966-4921', 'Paagahan', 'Electrician', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 364, 'Hour', 975, 853, 1.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('46f421e2-c6be-4cb6-8c68-ca449e1574c7', 'Levy', 'Finlow', 'lfinlow1z@apple.com', 'L0Jga2n6', '950-564-3442', 'Dongyangzhen', 'Editor', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 202, 'Day', 786, 784, 3.0);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('9a4836d8-51e9-4ba5-a51c-8c1a9995249d', 'Eba', 'Lovitt', 'elovitt20@youtu.be', 'Qz2T071Tw0C', '954-749-0731', 'Loei', 'Plumber', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 903, 'Day', 183, 902, 2.9);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('43c92762-1a00-42fb-b05d-8b9ba82bd9ed', 'Sheff', 'Bachnic', 'sbachnic21@wsj.com', 'BP7VPi', '798-373-5961', 'Peskovka', 'Electrician', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 641, 'Task', 103, 817, 3.6);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('efb23cb7-9438-4e54-b31a-769f1e761253', 'Janelle', 'Hefner', 'jhefner22@wikia.com', '4ci54VVz24j', '393-576-4566', 'Lapaz', 'Editor', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 565, 'Hour', 608, 346, 1.9);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('91355a6e-fb66-4ee1-a23c-8379d45de45d', 'Currey', 'Barras', 'cbarras23@businessweek.com', 'WEn3ShL0jh', '126-830-8006', 'Tegalwero', 'Plumber', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 545, 'Hour', 622, 387, 5.0);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('a6096454-9200-42f5-96d0-6c1f79517977', 'Hercule', 'Titterton', 'htitterton24@51.la', 'vrqe0a', '678-562-0978', 'Ibusuki', 'Developper', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 236, 'Day', 883, 228, 2.5);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('b1f35ab8-f2b1-4e7c-90de-838c4c25e1b0', 'Tiffani', 'De Bernardis', 'tdebernardis25@mit.edu', 'hkvIsYrs', '235-786-2090', 'Santo Domingo Oeste', 'Plumber', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 617, 'Hour', 906, 642, 1.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('d0d03a4f-6638-4f71-b6a0-26624befe2e6', 'Cobby', 'Scorey', 'cscorey26@gov.uk', 'QdxbaU', '148-975-7563', 'Fichē', 'Plumber', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 654, 'Week', 851, 377, 1.0);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('728ce732-c2bd-4032-af29-77d9a14082d3', 'Gabrielle', 'Rubinowitz', 'grubinowitz27@cbslocal.com', 'i4reCKCN', '484-704-2583', 'Olsztynek', 'Editor', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 793, 'Month', 813, 271, 4.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('cd59f617-b365-4342-b3af-55e492dfd99a', 'Rosella', 'Rebichon', 'rrebichon28@google.com.au', 'qhGtx7SPT0L1', '555-970-8524', 'Copán', 'Chef', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 189, 'Hour', 656, 493, 1.6);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('149f643d-e6d0-4987-abec-e769a0d8ac3e', 'Lewie', 'Scholard', 'lscholard29@google.it', '9tmP9Wh2s07u', '152-591-1488', 'Al Hoceïma', 'Electrician', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 436, 'Month', 334, 119, 2.9);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('f5386928-2499-4b6a-89b8-f1d7dc221c7e', 'Chiquita', 'Kobpac', 'ckobpac2a@gravatar.com', 'hed0NS7', '327-738-1509', 'Yanmenguan', 'Plumber', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 671, 'Day', 418, 74, 4.8);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('14178471-5324-4435-90e2-4b764dec36ab', 'Gretel', 'Greenhead', 'ggreenhead2b@live.com', 'd0XwE9jF', '449-832-7521', 'Capela', 'Electrician', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 191, 'Hour', 68, 179, 3.6);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('639d976f-c7fc-4ce0-b8f1-d2801c685303', 'Lara', 'Ducrow', 'lducrow2c@live.com', 'jmBvBUbRB1', '539-752-3286', 'Biasong', 'Developper', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 895, 'Month', 908, 728, 2.9);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('0eeb8eb4-2356-4571-97ed-b4477923da2e', 'Bartel', 'Dryburgh', 'bdryburgh2d@nytimes.com', 'SyrvWuX', '386-331-5259', 'Scarborough', 'Editor', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 112, 'Month', 521, 352, 2.6);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('7aa52d94-d5ce-452b-93ff-a8148775b24b', 'Ollie', 'Redolfi', 'oredolfi2e@sohu.com', 'bTHs2r8w', '226-493-0388', 'Xindian', 'Developper', 'Fusce consequat. Nulla nisl. Nunc nisl.', 458, 'Task', 147, 251, 3.2);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('3fd74a71-71bf-4971-a743-7efe22c103e9', 'Caria', 'Lasseter', 'classeter2f@mlb.com', 'bQGDsH', '437-935-0813', 'Huangtudian', 'Plumber', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 109, 'Day', 453, 573, 2.3);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('07e5c3f9-d64c-4162-bb60-a582b8d79884', 'Minetta', 'Austing', 'mausting2g@networksolutions.com', 'NlXoF6s', '181-467-2222', 'Tandaltī', 'Developper', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 610, 'Month', 172, 102, 3.0);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('4ba3582e-95ac-4226-9406-b6a3d5a04428', 'Warde', 'Westmacott', 'wwestmacott2h@xing.com', '93XZLKvCh', '396-459-6282', 'Skrzydlna', 'Plumber', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 644, 'Task', 162, 813, 2.8);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('fc6f232d-3370-4641-aa66-6789dde27028', 'Findley', 'Dawidowicz', 'fdawidowicz2i@dell.com', 'vcUsCGEk3', '352-221-6188', 'Guamo', 'Plumber', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 364, 'Month', 84, 5, 3.1);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('c8d6c98c-2460-4a9f-b290-5678cc7df656', 'Frants', 'Coneybeare', 'fconeybeare2j@reddit.com', 'GRjIst', '560-451-2436', 'Comrat', 'Chef', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 835, 'Day', 263, 307, 4.5);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('16c4628c-978f-46a8-a930-3132888b3603', 'Dalila', 'Wyke', 'dwyke2k@youtu.be', 'ejIt1z', '660-114-0993', 'Piskivka', 'Plumber', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 225, 'Week', 79, 965, 3.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('a3cb868b-ffc1-4a2f-b7a4-0b9947c7c9b0', 'Maribelle', 'Maydwell', 'mmaydwell2l@businessweek.com', 'JgfhCWo651', '351-296-3595', 'Pesochnoye', 'Plumber', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 402, 'Task', 699, 273, 3.4);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('cd0c7748-8f22-49b1-afbd-39bbfe68b29d', 'Lauree', 'MacFaul', 'lmacfaul2m@diigo.com', 'pX578UpTiV6', '128-282-0882', 'Liangshan', 'Plumber', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 679, 'Task', 364, 670, 4.2);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('60cd83a1-e9c7-413b-8918-31b931c9019e', 'Uriah', 'Deroche', 'uderoche2n@skyrock.com', 'mXvCJOZiCS5', '809-189-7944', 'Yangon', 'Chef', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.

Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 672, 'Task', 746, 598, 1.3);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('e382e6fa-1582-4867-bb25-f232faeddfae', 'Sydney', 'Leggatt', 'sleggatt2o@cbc.ca', 'vEoSIR', '320-641-9737', 'Del Valle', 'Electrician', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 565, 'Week', 83, 215, 4.4);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('8fcb1132-33f4-42a0-9fdf-b37b7065f53e', 'Celle', 'Fulbrook', 'cfulbrook2p@de.vu', 'sCXhwpAuxkOs', '193-997-0199', 'Borodinskiy', 'Developper', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.

Fusce consequat. Nulla nisl. Nunc nisl.', 658, 'Day', 650, 49, 1.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('c7a64ced-bc00-46a7-b2e8-4eb6a17f9c72', 'Wren', 'Pirot', 'wpirot2q@over-blog.com', '7NFdXYkXw', '572-460-3335', 'Lakki Marwat', 'Electrician', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 652, 'Month', 824, 734, 1.7);
insert into Worker (id, "firstName", "lastName", email, password, phone, city, job, "jobDescription", price, duration, "ratingsValue", "ratingsNumber", rating) values ('c3cb1a62-9c7e-4f86-ae99-35df2279b1fd', 'Bil', 'Cargill', 'bcargill2r@360.cn', 'JbP2k6tvYF', '604-494-0292', 'Cigembor', 'Chef', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 409, 'Hour', 322, 788, 3.8);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
