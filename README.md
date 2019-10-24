happner-red-bed
---------------
[happner-2 component](https://github.com/happner/happner-2) that integrates node-red into your happner-2 project by way of red-bed.

Quickstart:
-----------
```bash
git clone https://github.com/happner/happner-red-bed.git && cd happner-red-bed && npm i && node test/__fixtures/test-project/bin/start
```

To get an idea of what your project layout should look like, please [look here](https://github.com/happner/happner-red-bed/tree/master/test/__fixtures/test-project)
- you don't need to populate the node-red folder, red-bed will do this for you.
- you need to have a nodes folder in your project, as the component will move the happner nodes to that folder, you can put your own nodes in that folder as well.
