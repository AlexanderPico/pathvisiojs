describe('SVG', function() {
  
  describe('()', function() {
    var canvas, wrapper
    
    beforeEach(function() {
      wrapper = document.createElement('div')
      document.getElementsByTagName('body')[0].appendChild(wrapper)
      canvas = SVG(wrapper)
    })
    
    afterEach(function() {
      wrapper.parentNode.removeChild(wrapper)
    })
    
    it('creates a new svg canvas', function() {
      expect(canvas.type).toBe('svg')
    })
    it('creates an instance of SVG.Doc', function() {
      expect(canvas instanceof SVG.Doc).toBe(true)
    })
  })
  
  describe('create()', function() {
    it('creates an element with given node name and return it', function() {
      var element = SVG.create('rect')
      
      expect(element.nodeName).toBe('rect')
    })
    it('increases the global id sequence', function() {
      var did = SVG.did
        , element = SVG.create('rect')
      
      expect(did + 1).toBe(SVG.did)
    })
    it('adds a unique id containing the node name', function() {
      var did = SVG.did
        , element = SVG.create('rect')
      
      expect(element.getAttribute('id')).toBe('SvgjsRect' + did)
    })
  })
  
  describe('extend()', function() {
    it('adds all functions in the given object to the target object', function() {
      SVG.extend(SVG.Rect, {
        soft: function() {
          return this.opacity(0.2)
        }
      })
      
      expect(typeof SVG.Rect.prototype.soft).toBe('function')
      expect(draw.rect(100,100).soft().attr('opacity')).toBe(0.2)
    })
    it('accepts and extend multiple modules at once', function() {
      SVG.extend(SVG.Rect, SVG.Ellipse, SVG.Path, {
        soft: function() {
          return this.opacity(0.5)
        }
      })
      
      expect(typeof SVG.Rect.prototype.soft).toBe('function')
      expect(draw.rect(100,100).soft().attr('opacity')).toBe(0.5)
      expect(typeof SVG.Ellipse.prototype.soft).toBe('function')
      expect(draw.ellipse(100,100).soft().attr('opacity')).toBe(0.5)
      expect(typeof SVG.Path.prototype.soft).toBe('function')
      expect(draw.path().soft().attr('opacity')).toBe(0.5)
    })
    it('ignones non existant objects', function() {
      SVG.extend(SVG.Rect, SVG.Bogus, {
        soft: function() {
          return this.opacity(0.3)
        }
      })
      
      expect(typeof SVG.Rect.prototype.soft).toBe('function')
      expect(draw.rect(100,100).soft().attr('opacity')).toBe(0.3)
      expect(typeof SVG.Bogus).toBe('undefined')
    })
  })
  
  describe('get()', function() {
    it('gets an element\'s instance by id', function() {
      var rect = draw.rect(111,333)
      
      expect(SVG.get(rect.attr('id'))).toBe(rect)
    })
    it('makes have all the element\'s methods available', function() {
      var element = draw.group()
        , got = SVG.get(element.attr('id'))
      
      expect(got.transform()).toEqual(SVG.defaults.trans())
      expect(got.attr()).toEqual(element.attr())
    })
  })
  
})