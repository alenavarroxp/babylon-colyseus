import * as BABYLON from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import { getScene } from "../core/engineSetup";

export function createGUI(): void {
    const scene = getScene()
    GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI",true,scene);
}

function getAdvancedTexture(): GUI.AdvancedDynamicTexture {
    const scene = getScene();
    return GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI",true,scene);
}

export function createTargetGUI(mesh: BABYLON.Mesh,text:string): void {
    const target = new GUI.Rectangle();
    target.width = "160px";
    target.height = "100px";
    target.thickness = 0;
    target.background = "d";
    
    const advancedTexture = getAdvancedTexture();
    advancedTexture.addControl(target);

    target.linkWithMesh(mesh);
    target.linkOffsetY = -130;

    const label = new GUI.TextBlock();
    label.color = "white";
    label.text = text;
    target.addControl(label);
}

export function removeTargetGUI(mesh: BABYLON.Mesh): void {
    const advancedTexture = getAdvancedTexture(); // Obtener la textura avanzada donde están los controles

    // Buscar y eliminar todos los controles vinculados a este mesh
    for (const control of advancedTexture.getChildren()) {
        if (control.linkedMesh === mesh) {  // Verificar si el control está vinculado al mesh
            advancedTexture.removeControl(control); // Eliminar el control de la textura
            control.dispose(); // Liberar recursos del control
        }
    }
}
