var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

var renderer = new THREE.WebGLRenderer({
    antialias:true
});

cam.position.z += 25;
cam.position.y += 10;


renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);


scene.background = new THREE.Color(255897);

// let geo = new THREE.BoxGeometry(1,1,1);
let texture = new THREE.TextureLoader().load('texture/grass.jpg');
// let mat = new THREE.MeshStandardMaterial({
//     roughness: 10
// });
// let mesh = new THREE.Mesh(geo, mat);

// mesh.castShadow = true;
// mesh.receiveShadow = true;
// scene.add(mesh);
// scene.add(new THREE.BoxHelper(mesh, 0x000000));

//model loader
let land;
let loader = new THREE.GLTFLoader().load('model/scene.gltf', function(result){
    land = result.scene.children[0];
    land.castShadow = true;
    scene.add(land);
});

let pGeo = new THREE.PlaneGeometry(50, 50, 100, 100);
let pMat = new THREE.MeshPhongMaterial({
    color:0xffffff,
    side: THREE.DoubleSide
});
pMat.map = texture;

// bottom
let pMesh = new THREE.Mesh(pGeo,pMat);
pMesh.rotation.x -= Math.PI / 2;
pMesh.position.set(0,-10, 0);
pMesh.receiveShadow = true
scene.add(pMesh);

//lampu
let ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

let pLight = new THREE.PointLight(0xffffff, 0.7);
pLight.position.set(1,4,1);
pLight.castShadow = true;
scene.add(pLight);
scene.add(new THREE.PointLightHelper(pLight, 0.2, 0x000000));

//control
var controls = new THREE.OrbitControls(cam, renderer.domElement);

function draw(){
    // if(land){
    //     land.rotation.y -= 0.01;
    // }

    renderer.render(scene, cam);
    requestAnimationFrame(draw);
}
draw();