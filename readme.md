# @focme/rollup-plugin-pick

pick up values from the .json file and write it into a new file  

in default without a config will pick up `package.json` file in project main directory  
to the `./dist` directory  

## usage  

```javascript
// rollup.config.js
import pick from "@focme/rollup-plugin-pick"

export default {
    ...
    plugins: [
        ...
        pick({ ... })
    ]
}
```

## option  

default value  
```javascript
// the same option
pick()

pick({
    src: "./package.json",
    dest: "./dist"
})
```

pass `pick` array to the function  
```javascript
// the same option
pick(["name", "version"])

pick({
    src: "./package.json",
    dest: "./dist",
    pick: ["name", "version"]
})
```

**src**  
type `string`  
set the input file  
default value `./package.json` if not set

relative paths are matched based on `process.cwd()`

**dest**  
type `string`  
set the output file path  
default value `./dist` if not set  

relative paths are matched based on `process.cwd()`

**filename**  
type `string`  
set the output file name  
use `src` file's name if not set   

**pick**  
type `string[]` or `entries`  
like `[key_1, key_2]` or `[[key_1, value_1?], [key2, value_2?]]`
set the values from the `src` file to the `dest` file  
use all the `src` file values if not set  

`value` could be undefined or a value  

```json
// pick({ pick: ["name", "auther"] })
// pick up src file values
{
    "name": "@focme/rollup-plugin-pick",
    "auther": "focme"
}

// pick({ pick: ["name", ["auther", "others"]] })
// use the pick-up value instead of src file values
{
    "name": "@focme/rollup-plugin-pick",
    "auther": "others"
}
```

**transform**  
type `(current: Record<string, any>, origin: Record<string, any>) => Record<string, any>`  
format the final value before write into output file  

```javascript
// rollup.config.js
import pick from "@focme/rollup-plugin-pick"

export default {
    ...
    plugins: [
        ...
        pick({
            pick: ["name", "auth"],
            transform: (current, origin) => {
                return { ...current, auther: origin.auther + "-auther" }
            }
        })
    ]
}
```

```json
// current value
{
    "name": "@focme/rollup-plugin-pick",
    "auther": "focme"
}

// origin value
// the value of ./package.json

// final value
{
    "name": "@focme/rollup-plugin-pick",
    "auther": "focme-auther"
}
```