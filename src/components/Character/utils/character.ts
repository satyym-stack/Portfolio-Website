import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(`${import.meta.env.BASE_URL}draco/`);
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          `${import.meta.env.BASE_URL}models/character.enc`,
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                const meshName = mesh.name.toLowerCase();
                const matName = mesh.material && (mesh.material as any).name ? (mesh.material as any).name.toLowerCase() : "";
                
                // Adjust skin to be tan
                if (
                  meshName === "cube002" || 
                  meshName.includes("skin") || 
                  meshName.includes("head") || 
                  meshName.includes("face") || 
                  meshName.includes("hand") || 
                  meshName.includes("neck") ||
                  meshName.includes("ear") ||
                  matName.includes("skin") ||
                  matName.includes("face") ||
                  matName.includes("ear")
                ) {
                  if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).color) {
                    (mesh.material as THREE.MeshStandardMaterial).color.setHex(0x8d5524); // Warm brown skin tone
                    (mesh.material as THREE.MeshStandardMaterial).roughness = 0.65; // Matte, not shiny
                    (mesh.material as THREE.MeshStandardMaterial).metalness = 0.05; // Non-metallic skin
                  }
                }
                // Adjust hair to be black
                else if (meshName.includes("hair") || matName.includes("hair") || meshName.includes("eyebrow") || matName.includes("eyebrow")) {
                  if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).color) {
                    (mesh.material as THREE.MeshStandardMaterial).color.setHex(0x111111);
                    (mesh.material as THREE.MeshStandardMaterial).roughness = 0.8;
                    (mesh.material as THREE.MeshStandardMaterial).metalness = 0.1;
                  }
                }
                // Adjust clothes/fur to be black furry-like
                else if (meshName.includes("cloth") || matName.includes("cloth") || meshName.includes("shirt") || matName.includes("shirt") || meshName.includes("fur") || matName.includes("fur") || meshName.includes("pant") || meshName.includes("shoe") || meshName.includes("sole")) {
                  if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).color) {
                    (mesh.material as THREE.MeshStandardMaterial).color.setHex(0x181818);
                    (mesh.material as THREE.MeshStandardMaterial).roughness = 0.9;
                    (mesh.material as THREE.MeshStandardMaterial).metalness = 0.0;
                  }
                }
              }
            });
            (window as any).characterMeshes = [];
            character.traverse((child: any) => { if (child.isMesh) (window as any).characterMeshes.push({name: child.name, mat: child.material?.name}); });

            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
