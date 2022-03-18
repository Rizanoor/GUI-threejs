let scene = new THREE.Scene();
let cam = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
);

let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0xfafafa);
cam.position.z += 25;
cam.position.y += 10;


let controls = new THREE.OrbitControls(cam, renderer.domElement);

let grid = new THREE.GridHelper(100,20,0x0a0a0a,0x0a0a0a);
grid.position.y -= 1.5;
scene.add(grid);

let pLight = new THREE.PointLight(0xffffff,1);
pLight.position.set(1,15,15);
scene.add(pLight);

let cubeGeo = new THREE.BoxGeometry(3,3,3);
let cubeMat = new THREE.MeshLambertMaterial({color:0xff0000});
let cubeMesh = new THREE.Mesh(cubeGeo,cubeMat);
scene.add(cubeMesh);

// let tween1 = gsap.to(cubeMesh.position,{x:5, z:5, duration:5, paused:true});
// let tween2 = gsap.to(cubeMesh.position,{x:5, z:5, duration:5, paused:true});

// tween1.play();
// tween2.play();

// gsap.from(cubeMesh.position,{x:10, duration:2});

let t1 = gsap.timeline();
t1.to(cubeMesh.position, {x:5, duration:1});
t1.to(cubeMesh.position, {z:5, duration:1});
t1.to(cubeMesh.position, {y:5, duration:1});
t1.to(cubeMesh.scale, {x:2, y:2});

let t2 = gsap.timeline();
t2.to(cubeMesh.position,{x:-5});
t2.to(cubeMesh.position,{z:-5});

let t = gsap.timeline({paused:true});
t.add(t1);
t.add(t2);

let ganjil = false;

addEventListener('mousedown', function(e){
    if (ganjil == false){
        t.play();
    }
    else{
        t.reverse();
    }
    ganjil = !ganjil;
});

function draw(){
    renderer.render(scene, cam);
    requestAnimationFrame(draw);
}
draw();