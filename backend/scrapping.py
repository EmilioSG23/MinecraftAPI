import os
import json
import requests

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

def merge_json_biomes_structures (biomes, structures):
    for biome in biomes:
        for structure in structures:
            for biome_structure in structure["biomes"]:
                print(biome_structure)
                if biome_structure == biome["id"]:
                    biome["structures"].append(structure["id"])
    save_json_in_file("E:\Proyectos\MinecraftAPI/new_datas.json", biomes)

def rename_image_biomes (folder, biomesJSON):
    for filename in os.listdir(folder):
        old_route = os.path.join(folder, filename)
        if filename.endswith('.webp'):
            route = old_route.split("300px-")
            biome_name = (route[1]).split(".webp")[0]
            biome_name = biome_name.replace ("_", " ")
            print(biome_name)
            for biome in biomesJSON:
                if biome["name"] == biome_name:
                    os.rename(old_route, route[0]+biome["id"]+".webp")
            
def request_to_api (api):
    mergedData = []
    response = requests.get(api)
    if response.status_code == 200:
        datas = response.json()
        for data in datas:
            mergedData.append({
                "id": data["namespacedId"],
                "name": data["name"],
                "tier": "Uncommon",
                "renewable": True,
                "tool": data["tool"],
                "stackable": 64,
                "blastResistance": data["blastResistance"],
                "hardness": 0,
                "luminous": data["luminance"],
                "transparent": data["transparent"],
                "flammable": data["flammable"],
                "waterloggeable": False,
            })
        save_json_in_file("E:\Proyectos\MinecraftAPI/new_datas.json", mergedData)
    else:
        print("Error")

# Uso
#data1 = load_json("E:\Proyectos\MinecraftAPI\src\data/biomes.json")
#data2 = load_json("E:\Proyectos\MinecraftAPI\src\data/structures.json")

#merge_json_files ("E:\Proyectos/1.21.4\data\minecraft/tags\worldgen/biome", "E:\Proyectos\MinecraftAPI\datas.json")

request_to_api("https://minecraft-api.vercel.app/api/blocks")