import pymysql

class MysqlConn:
	def __init__(self):
		self.mydb = pymysql.connect(
				host="docker", user="root", passwd="123456", database="test")
		self.mycursor = self.mydb.cursor()

	def execute(self, sql, values):
		self.mycursor.execute(sql, values)
		self.mydb.commit()
		return self.mycursor.rowcount

	def executeMany(self, sql, values):
		self.mycursor.executemany(sql, values)
		self.mydb.commit()
		return self.mycursor.rowcount

	def select(self, sql, values):
		self.mycursor.execute(sql, values)
		return self.mycursor.fetchall()

	def close(self):
		self.mycursor.close()
		self.mydb.close()


conn = MysqlConn()
data = conn.select('select name from user where name = %s', 'cbh')
print(list(data[0]))
