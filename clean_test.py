import csv

file_path = 'NL2SQL_Cleaned.csv'
file_path = 'NL2SQL_Modified.csv'
sql_starters = ('SELECT', 'UPDATE', 'INSERT', 'DELETE', 'CREATE')

count, count2 = 0,0
count3 = 0
with open(file_path, 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)

    for row_num, row in enumerate(reader, start=1):
        if len(row) >=3:
            print(f"Row {row_num}: [more than 2 columns] {row}")
            count3+=1
        if len(row) >= 2:
            query = row[1].strip().upper()
            if not query.startswith(sql_starters):
                print(f"Row {row_num}: {row}")
                count+=1
        else:
            print(f"Row {row_num}: [Invalid or incomplete row] {row}")
            count2+=1
print('incorrect 2nd column',count,'no second column',count2)
print('more than 2 columns',count3)

