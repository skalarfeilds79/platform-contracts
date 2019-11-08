# To make it really easy to work with the outputs file from the manager,
# this script converts the JSON file into a typescript file

# Remove old transpiled outputs from the deployments/ directory
rm -f deployments/outputs.ts

# Output a TS file from the generated JSON file

filename=outputs
filename_base=$(basename $filename .json)
echo -e "/* tslint:disable */\n\nexport const $filename_base = " > "../artifacts/src/$filename_base.ts"
cat "../artifacts/src/$filename_base.json" >> "../artifacts/src/$filename_base.ts"