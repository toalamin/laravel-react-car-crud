<?php


namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\repositories\ProjectRepository;
use Illuminate\Http\Request;
use App\Carlist;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


class CarlistController extends Controller
{
   
 public function index()
    {
        $carlist = $this->getAll();

        return response()->json([
            'success' => true,
            'message' => 'Carlist List',
            'data'    => $carlist
        ]);
    }

    /**
     * show() Find Project By ID
     *
     * @param integer $id
     * @return response
     */
    public function show($id)
    {
        $carlist = $this->findById($id);
        if (is_null($carlist)) {
            return response()->json([
                'success' => false,
                'message' => 'carlist Details',
                'data'    => null
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'carlist Details',
            'data'    => $carlist
        ]);
    }

    /**
     * store() Create New Project
     *
     * @param Request $request
     * @return response
     */
    public function store(Request $request)
    {

       




        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name' => 'required',
            'brand_name' => 'required',
            'model_name' => 'required',
            'description' => 'required',
            'image' => 'required|image',
           
        ], [
            'brand_name.required' => 'Please give brand name',
            'model_name.required' => 'Please give model name',
            'name.required' => 'Please give car name',
            'description.required' => 'Please give car description',
            'image.required' => 'Please give car image',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }


        $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
        Storage::disk('public')->putFileAs('product/image', $request->image,$imageName);


        $carlist = $this->create($request,$imageName);
        return response()->json([
            'success' => true,
            'message' => 'carlist Stored',
            'data'    => $carlist
        ]);
    }

    /**
     * update() Update project by id
     *
     * @param Request $request
     * @param integer $id
     * @return response
     */
    public function update(Request $request, $id)
    {
        $carlist = $this->findById($id);
        if (is_null($carlist)) {
            return response()->json([
                'success' => false,
                'message' => 'carlist Not found',
                'data' => null,
            ]);
        }

        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name' => 'required',
            'description' => 'required',
           
        ], [
            'name.required' => 'Please give project name',
            'description.required' => 'Please give project description',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $carlist = $this->edit($request, $id);


            if($request->hasFile('image')){

                // remove old image
                if($product->image){
                    $exists = Storage::disk('public')->exists("product/image/{$product->image}");
                    if($exists){
                        Storage::disk('public')->delete("product/image/{$product->image}");
                    }
                }

                $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('product/image', $request->image,$imageName);
                $product->image = $imageName;
                $product->save();
            }


        return response()->json([
            'success' => true,
            'message' => 'carlist Updated',
            'data'    => $carlist
        ]);
    }

    /**
     * destry() Delete a carlist
     *
     * @param integer $id
     * @return response
     */
    public function destroy($id)
    {




        $carlist = $this->findById($id);
        if (is_null($carlist)) {
            return response()->json([
                'success' => false,
                'message' => 'carlist Not found',
                'data' => null,
            ]);
        }

        $carlist = $this->delete($id);
        return response()->json([
            'success' => true,
            'message' => 'carlist Deleted',
            'data'    => $carlist
        ]);
    }




 public function getAll()
    {
        $carlist = Carlist::all();
        return $carlist;
    }


 public function create(Request $request,$imageName)
    {
        $carlist = new Carlist();
        $carlist->name = $request->name;
        $carlist->brand_name = $request->brand_name;
        $carlist->model_name = $request->model_name;
        $carlist->description = $request->description;
        $carlist->image = $imageName;
      
        $carlist->save();
        return $carlist;
    }





    public function findById($id)
    {
        $carlist = Carlist::find($id);
        return $carlist;
    }
   
    public function edit(Request $request, $id)
    {
        $carlist = $this->findById($id);
        $carlist->name = $request->name;
        $carlist->description = $request->description;
        $carlist->save();
        return $carlist;
    }
    public function delete($id)
    {
        $carlist = $this->findById($id);
        $carlist->delete();
        return $carlist;
    }

}