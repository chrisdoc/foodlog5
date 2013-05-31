TAFFY.extend("group",function (cols) {
    var db, groups, i, j, result = [];
    this.context({
        results: this.getDBI().query(this.context())
    });
    
    db = TAFFY(this.context().results);
    groups = db().distinct.apply(db(), arguments);
    
    for(i=0;i<groups.length;i++){
        var obj = {}, filter = {}, group;
        group = groups[i];
        for(j=0;j<arguments.length;j++){
            filter[arguments[j]] = group[j];
        }
        obj.group = group;
        obj.result = db(filter).get();
        obj.count = obj.result.length;
        result.push(obj);
    }
    
    return result;
});