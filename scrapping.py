import os
import json

def load_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

# Función para guardar un archivo JSON
def save_json(file_path, data):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

def merge_json_files(folder_path, output_file):
    merged_data = []

    # Recorrer los archivos en la carpeta
    for filename in os.listdir(folder_path):
        if filename.endswith('.json'):  # Verifica si el archivo es un JSON
            file_path = os.path.join(folder_path, filename)

            # Abrir y cargar el archivo JSON
            with open(file_path, 'r') as f:
                data = json.load(f)
                relative_path = file_path.split('biome\\')[1]  # Extrae la parte después de 'biome\\'
                filename_without_extension = os.path.splitext(relative_path)[0]
                print (data)
                newData = {
                    "id": filename_without_extension,
                    "values": data["values"]
                }
                merged_data.append(newData)
        save_json_in_file(output_file, merged_data)

def save_json_in_file(output_file, merged_data):
    with open(output_file, 'w') as f:
        json.dump(merged_data, f, indent=4)

def merge_json(data1, data2):
    mergeData = []
    for d1 in (data1):
        mergeData.append({
            "id": d1["id"],
            "name": d1[""],
            "biomes": d1["biomes"],
            "lootBox": d1["lootBox"]
        })
    save_json_in_file("E:\Proyectos\MinecraftAPI/new_datas.json", mergeData)


def merge_json_biomes(data1, data2):
    print("================")
    for structure in data1:
        biomes = structure["biomes"]
        for biome in structure["biomes"]:
            if biome.startswith("#"):
                biome_without = biome.split(":")[1]
                for biome2 in data2:
                    if biome2["id"] == biome_without:
                        biomes.extend(biome2["values"])
        filterBiomes = []
        for biome in biomes:
            if not biome.startswith("#"):
                filterBiomes.append(biome)
        structure["biomes"] = filterBiomes
    save_json_in_file("E:\Proyectos\MinecraftAPI/new_datas.json", data1)

# Uso
data1 = load_json("E:\Proyectos\MinecraftAPI\src\data/structures.json")
data2 = load_json("E:\Proyectos\MinecraftAPI\datas.json")

#merge_json_files ("E:\Proyectos/1.21.4\data\minecraft/tags\worldgen/biome", "E:\Proyectos\MinecraftAPI\datas.json")
merge_json_biomes(data1,data2)