import csv

input_path = 'NL2SQL_Query_Dataset.csv'
output_path = 'NL2SQL_Cleaned.csv'

with open(input_path, 'r', encoding='utf-8') as infile, open(output_path, 'w', encoding='utf-8', newline='') as outfile:
    writer = csv.writer(outfile)
    writer.writerow(['Prompt', 'Query'])  # Write header

    for line in infile:
        line = line.strip()

        # Only process lines that have the '.,' separator
        if '.,' in line:
            # Replace all commas with semicolons
            temp_lines = line.split('.,', 1)
            if len(temp_lines)>1:
                temp_lines[0] = temp_lines[0].replace(',', ';')
            # line = "".join(temp_lines)
            # line = line.replace(',', ';')

            # # Find last occurrence of '.;' and replace with '.,' again
            # split_index = line.rfind('.;')
            # if split_index != -1:
            #     prompt = line[:split_index + 1].replace(';', ',')  # revert inside prompt
            #     query = line[split_index + 2:].replace(';', ',')   # revert inside query
            #     writer.writerow([prompt, query])
        # else:
        #     # Fallback: try regular CSV split
        #     parts = line.split(',', 1)
        #     if len(parts) == 2:
        #         writer.writerow([parts[0], parts[1]])
        else:
            temp_lines = line.split(',', 1)
            print(temp_lines)
        writer.writerow([temp_lines[0], temp_lines[1]])
