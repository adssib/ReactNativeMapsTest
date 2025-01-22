import csv

def csv_to_typescript_array(csv_file, output_file):
    try:
        # Read CSV file
        with open(csv_file, 'r') as file:
            reader = csv.DictReader(file)
            rows = [row for row in reader]

        # Open output TypeScript file
        with open(output_file, 'w') as ts_file:
            ts_file.write("const buildings = [\n")
            
            for row in rows:
                # Write each row as a TypeScript object
                ts_file.write("  {\n")
                for key, value in row.items():
                    # Determine if the value is a number or string
                    if value.replace('.', '', 1).isdigit():
                        ts_file.write(f"    {key}: {value},\n")
                    else:
                        ts_file.write(f"    {key}: \"{value}\",\n")
                ts_file.write("  },\n")
            
            ts_file.write("];\n\n")
            ts_file.write("export default buildings;\n")

        print(f"Successfully converted {csv_file} to {output_file}")
    
    except Exception as e:
        print(f"Error: {e}")

# Input CSV file path and output TypeScript file path
csv_file_path = "BUILDING_LIST.csv"
output_ts_file_path = "Buildings/BuildingsMarkers.ts"

# Call the function
csv_to_typescript_array(csv_file_path, output_ts_file_path)
